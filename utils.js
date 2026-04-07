/*
  ================================================================
  EcoSmart Smart Bin — Arduino Uno R3
  Sensors: IR Sensor + DHT11  (NO motors)
  ================================================================

  LIBRARY INSTALL (do this FIRST in Arduino IDE):
    Sketch → Include Library → Manage Libraries
    Search: "DHT sensor library"  →  Install by Adafruit
    When asked "Install all dependencies" → click Yes

  PIN WIRING:
    IR Sensor    VCC → 5V    GND → GND    OUT → D2
    DHT11        VCC → 5V    GND → GND    DATA → D4
    (D3 is NOT used — moved DHT11 to D4 to avoid conflicts)

  WHY D4 INSTEAD OF D3?
    D3 is a PWM-capable pin that can have interference.
    D4 is a clean digital pin — more reliable for DHT11.

  HOW TO VERIFY IT'S WORKING:
    After uploading, open Arduino IDE:
    Tools → Serial Monitor → set baud to 9600
    You should see every 5 seconds:
      {"bid":"BIN001","lvl":0,"full":false,"ir":0,"tmp":28.5,"hum":64.0}
    If tmp shows -1, check your DHT11 wiring.

  WHAT EACH VALUE MEANS:
    bid  = bin ID (matches your bridge.js settings)
    lvl  = fill level 0-99% (estimated from IR sensor)
    full = true when bin is full (IR detected 3 times in a row)
    ir   = 1 if IR currently sees an object, 0 if clear
    tmp  = temperature in Celsius from DHT11
    hum  = humidity % from DHT11
  ================================================================
*/

#include <DHT.h>

// ── PIN NUMBERS ──────────────────────────────────────────────
#define PIN_IR   2    // IR sensor OUT → D2
#define PIN_DHT  4    // DHT11 DATA → D4  (NOT D3)
#define PIN_LED  13   // Built-in LED — blinks every send

// ── DHT11 ────────────────────────────────────────────────────
DHT dht(PIN_DHT, DHT11);

// ── YOUR BIN ID ──────────────────────────────────────────────
const char BIN_ID[] = "BIN001";

// ── TIMING ───────────────────────────────────────────────────
const unsigned long SEND_EVERY    = 5000;   // send data every 5 sec
const unsigned long DHT_READ_EVERY = 3000;  // read DHT11 every 3 sec

// How many consecutive IR hits = bin full
const int FULL_COUNT = 3;

// ── STATE ────────────────────────────────────────────────────
int   fillLevel  = 0;
int   irHits     = 0;
bool  alertSent  = false;

float lastTemp   = -1.0;
float lastHum    = -1.0;

unsigned long lastSentAt    = 0;
unsigned long lastDHTReadAt = 0;

// ─────────────────────────────────────────────────────────────
void setup() {
  Serial.begin(9600);
  pinMode(PIN_IR,  INPUT);
  pinMode(PIN_LED, OUTPUT);

  // Start DHT11
  dht.begin();

  // DHT11 MUST have at least 2 seconds after power-on before first read
  // We wait 3 seconds to be safe
  delay(3000);

  // Do NOT read DHT11 here yet — give it one more loop cycle
  // Just send the online message
  Serial.print(F("{\"status\":\"online\",\"bid\":\""));
  Serial.print(BIN_ID);
  Serial.println(F("\"}"));

  // Initialise timers so first read happens immediately
  lastDHTReadAt = millis();
  lastSentAt    = millis();
}

// ─────────────────────────────────────────────────────────────
void loop() {
  unsigned long now = millis();

  // ── 1. Read DHT11 every 3 seconds ──────────────────────────
  if (now - lastDHTReadAt >= DHT_READ_EVERY) {
    lastDHTReadAt = now;

    float t = dht.readTemperature();
    float h = dht.readHumidity();

    // DHT11 returns NaN if reading fails — only update if valid
    if (!isnan(t) && t > 0.0 && t < 80.0) {
      lastTemp = t;
    }
    if (!isnan(h) && h > 0.0 && h <= 100.0) {
      lastHum = h;
    }
  }

  // ── 2. Read IR sensor (fast, every loop) ───────────────────
  // LOW signal = object detected (waste blocking the sensor)
  bool irNow = (digitalRead(PIN_IR) == LOW);

  if (irNow) {
    irHits    = min(irHits + 1, 99);
    fillLevel = min(fillLevel + 5, 99);
  } else {
    if (irHits > 0)    irHits--;
    if (fillLevel > 0) fillLevel--;
  }

  bool binFull = (irHits >= FULL_COUNT);

  // When bin is cleared after being full, reset so next fill alerts again
  if (!binFull && alertSent) {
    alertSent = false;
  }
  if (binFull && !alertSent) {
    alertSent = true;
  }

  // ── 3. Send JSON every 5 seconds ───────────────────────────
  if (now - lastSentAt >= SEND_EVERY) {
    lastSentAt = now;

    // Build the JSON string
    Serial.print(F("{\"bid\":\""));
    Serial.print(BIN_ID);

    Serial.print(F("\",\"lvl\":"));
    Serial.print(fillLevel);

    Serial.print(F(",\"full\":"));
    Serial.print(binFull ? F("true") : F("false"));

    Serial.print(F(",\"ir\":"));
    Serial.print(irNow ? 1 : 0);

    Serial.print(F(",\"tmp\":"));
    if (lastTemp > 0) {
      Serial.print(lastTemp, 1);
    } else {
      Serial.print(F("-1"));
    }

    Serial.print(F(",\"hum\":"));
    if (lastHum > 0) {
      Serial.print(lastHum, 1);
    } else {
      Serial.print(F("-1"));
    }

    Serial.println(F("}"));

    // Blink the built-in LED to confirm data was sent
    digitalWrite(PIN_LED, HIGH);
    delay(80);
    digitalWrite(PIN_LED, LOW);
  }
}
