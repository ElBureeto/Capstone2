# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt
import time
import random as rand

deviceID = "vs002"
pollingRate = 0.5 #number of reads each sensor has per second
running = True

client = mqtt.Client(client_id="v_sens000")
client.username_pw_set("mqtsqrfd", "qWsfSyHmt1D-")
timestamp = 0

def read_sensors():
    global client
    global timestamp
    timeDelayBetweenReads = 1 #in secs
    timeTillSinceRead = (time.time() - timestamp)

    if timeTillSinceRead < timeDelayBetweenReads:
        time.sleep(timeDelayBetweenReads - timeTillSinceRead)

    timestamp = time.time()
    for j in range(10):
        message = deviceID + "," + str(timestamp) + "," + str(j) + "," + str((rand.randrange(1, 200, 3) * 3.14159)  % 20)
        client.publish("/" + deviceID + "/data", message)
        print(message)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("/" + deviceID)
    client.publish("/connected", deviceID)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    command = str(msg.payload).replace('\'', '').replace('b', '', 1).lower()
    if command == "get" or command == "start":
        read_sensors()

client.on_connect = on_connect
client.on_message = on_message

client.connect("hairdresser.cloudmqtt.com", 17102, 60)    

#while running:
#    timestamp = time.time()
#    for j in range(10):
#        message = deviceID + "," + str(timestamp) + "," + str(j) + "," + str((rand.randrange(1, 200, 3) * 3.14159)  % 20)
#        client.publish("/data", message)
#        print(message)
#    time.sleep((1 / pollingRate) - (time.time() - timestamp))


# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()