#include <YunServer.h>
#include <YunClient.h>


#define LED_PIN 13
#define PIN_ONE 8
#define PIN_TWO 9
#define PIN_THREE 10

// Listen on default port 5555, the webserver on the Yun
// will forward there all the HTTP requests for us.
YunServer server;
bool ledState[] = {};

void setup() {
  // init pins and make sure they are off
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
 
  pinMode(PIN_ONE, OUTPUT);
  digitalWrite(PIN_ONE, LOW);
  pinMode(PIN_TWO, OUTPUT);
  digitalWrite(PIN_TWO, LOW);
  pinMode(PIN_THREE, OUTPUT);
  digitalWrite(PIN_THREE, LOW);

  Bridge.begin();
  server.begin();
}

void loop() {
  // Get clients coming from server
  YunClient client = server.accept();

  // There is a new client?
  if (client) {    
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  delay(50); // Poll every 50ms
}

void process(YunClient client) {
  // read the command
  String command = client.readString();
  command.trim();
  
  client.println("Status: 200");
  client.println("Access-Control-Allow-Origin: *");   
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Content-Type: text/html");
  client.println();
  
  // perform the requested action
  if(command == "1/on") {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(PIN_ONE, HIGH);
    client.println("TURNING ON ONE");
  }
  else if(command == "1/off") {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(PIN_ONE, LOW);
    client.println("TURNING OFF ONE");
  }
  else if(command == "2/on") {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(PIN_TWO, HIGH);
    client.println("TURNING ON TWO");
  }
  else if(command == "2/off") {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(PIN_TWO, LOW);
    client.println("TURNING OFF TWO");
  }
  else if(command == "3/on") {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(PIN_THREE, HIGH);
    client.println("TURNING ON THREE");
  }
  else if(command == "3/off") {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(PIN_THREE, LOW);
    client.println("TURNING OFF THREE");
  }
  else client.println("Unknown command");
}

