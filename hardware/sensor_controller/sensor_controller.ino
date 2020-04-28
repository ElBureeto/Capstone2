/*
  Capstone Project
  A-Team

  Balanced Breaker Box Sensor Array Controller
*/

/* NOTE
 * client.subscribe(MQTT_SERIAL_RECEIVER_CH) used to subsctibe to a mqtt 
 * channelclient.publish(MQTT_SERIAL_PUBLISH_CH, MESSAGE) used to publish message to data 
*/
#include <WiFi.h>
#include <PubSubClient.h>
#include <time.h>
#include <string.h>

//Device Info
#define DEVICE_NAME "Box Sensor V0.1"
#define DEVICE_ID "rw001" 

//Size of buffer equivalent to the number of sensors
#define BUFFER_SIZE 20

//Declaring Pins **temp pin numbers currently**
#define MUX_PIN_S0 0 //output pin 0 for mux
#define MUX_PIN_S1 1 //output pin 1 for mux
#define MUX_PIN_S2 2 //output pin 2 for mux
#define MUX_PIN_S3 4 //output pin 3 for mux
#define MUX_SIG_PIN 3 //pin signal is read from mux0

//WiFi Connection
#define ssid "Apt 109"
#define password "******"

//Mqtt Connection
#define mqttServer "hairdresser.cloudmqtt.com"
#define mqttPort 17102
#define mqttUser "mqtsqrfd"
#define mqttPassword "******"

//Status Light Pins
#define LIGHT_PIN_R 12
#define LIGHT_PIN_G 13
#define LIGHT_PIN_B 14

/* Mqtt Communication
 * transmiting channel /{DEVICE_ID}
 * receiveing channel /{DEVICE_ID}/ping 
*/
char* mqttTransmitChannel;
char* mqttReceiveChannel;
char* mqttConnectedChannel;

WiFiClient wifiClient;
PubSubClient client(wifiClient);

bool wifiConnected = false;
bool mqttConnected = false;

/*
  Connects Controller to WiFi
*/
void setup_wifi(){
  delay(10);
  Serial.print("\nConnecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.print("\nWifi Connected\nIp address: ");
  Serial.println(WiFi.localIP());
  wifiConnected = true;
}

void reconnect(){
  while(!client.connected()){
    Serial.print("Attempting to connect to MQTT...");
    String clientId = DEVICE_ID;
    if(client.connect(clientId.c_str(), mqttUser, mqttPassword)){
      Serial.println("Connected To Server");
      client.publish(mqttConnectedChannel, DEVICE_ID);
      client.subscribe(mqttReceiveChannel);
    }
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void callback(char* topic, byte *payload, unsigned int length) {
    Serial.println("-------new message from broker-----");
    Serial.print("channel:");
    Serial.println(topic);
    Serial.print("data:"); 
    Serial.write(payload, length);
    Serial.println();
}

int readSensor(bool testing){  
  if(testing){
    time_t t;
    srand((unsigned) time(&t));

    return((rand() % 20) + 1);
  }
  return analogRead(MUX_SIG_PIN);
}

uint8_t* selectPin(byte num){
  if (byte & (1<<i))
      digitalWrite(selectPins[i], HIGH);
    else
      digitalWrite(selectPins[i], LOW);
}

/*
void update_light(){
  if(wifiConnected == false){
    analogWrite(LIGHT_PIN_R, 200);
    analogWrite(LIGHT_PIN_G, 0);
    analogWrite(LIGHT_PIN_B, 0);
  }
  else if(){
    analogWrite(LIGHT_PIN_R, 0);
    analogWrite(LIGHT_PIN_G, 200);
    analogWrite(LIGHT_PIN_B, 200);
  }
  else{
    analogWrite(LIGHT_PIN_R, 0);
    analogWrite(LIGHT_PIN_G, 200);
    analogWrite(LIGHT_PIN_B, 0);
  }
}*/

void setup(){
  pinMode(LIGHT_PIN_R, OUTPUT);
  pinMode(LIGHT_PIN_G, OUTPUT);
  pinMode(LIGHT_PIN_B, OUTPUT);

  analogWrite(LIGHT_PIN_R, 0);
  analogWrite(LIGHT_PIN_G, 0);
  analogWrite(LIGHT_PIN_B, 200);

  Serial.begin(115200);
  Serial.setTimeout(500);
    
  setup_wifi();

  mqttTransmitChannel = strcat("/", strcat(DEVICE_ID, "/data"));
  mqttReceiveChannel = strcat("/", DEVICE_ID);
  mqttConnectedChannel = "/connected";
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  reconnect();
  
  update_light()
}

void loop(){
  client.loop();

  if(WiFi.status() != WL_CONNECTED){
     wifiConnected = false;
      update_light();
     setup_wifi();
  }
  else if(!client.connected){
    reconnect();
    update_light();
    reconnect();
  }

  //Gets the time
  struct tm* ptr; 
  time_t lt; 
  lt = time(NULL); 
  ptr = gmtime(&lt);
  char* timestamp = asctime(ptr);

  //read data from the sensor and send to server
  for(int i = 0; i < 10; i++){
    selectPins(i % 10);
    float result;
    result = readSensor(false);

    //construct payload message
    char *part = "";
    char *msg = strcat(DEVICE_ID, strcat(",", timestamp));
    itoa(i, part);
    msg = strcat(msg, strcat(",", part));
    gcvt(result, 6, part);
    msg = strcat(msg, strcat(",", part);

    
    client.publish(mqttTransmitChannel, msg);
  }
}
