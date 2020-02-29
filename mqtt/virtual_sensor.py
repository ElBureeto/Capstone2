# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt
import time
import random as rand

deviceID = "vs002"
pollingRate = 0.5 #number of reads each sensor has per second
running = True

client = mqtt.Client(client_id="v_sens000")
client.username_pw_set("mqtsqrfd", "qWsfSyHmt1D-")
timeDelayBetweenReads = 10 #sec
timestamp = 0

def read_sensors():
    global client
    global timestamp
    global timeDelayBetweenReads
    timeTillSinceRead = (time.time() - timestamp)

    if timeTillSinceRead < timeDelayBetweenReads:
        time.sleep(timeDelayBetweenReads - timeTillSinceRead)

    timestamp = time.time()
    for j in range(10):
        message = deviceID + "," + str(timestamp) + "," + str(j) + "," + str((rand.randrange(1, 200, 3) * 3.14159)  % 20)
        client.publish("/" + deviceID + "/data", message)
        #print(message) uncomment for debugging of message

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("/" + deviceID)
    client.publish("/connected", deviceID)
    client.subscribe("/" + deviceID + "/delay")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    command = str(msg.payload).replace('\'', '').replace('b', '', 1).lower()
    if msg.topic == "/" + deviceID + "/delay":
        try:
            global timeDelayBetweenReads
            timeDelayBetweenReads = int(command)
            print("Time delay set to: " + command) #doesnt work while broker is running
        finally:
            return
    elif command == "get" or command == "start":
        read_sensors()
    elif command == "reconnect":
        client.reconnect()
    

client.on_connect = on_connect
client.on_message = on_message

client.connect("hairdresser.cloudmqtt.com", 17102, 60)    

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()