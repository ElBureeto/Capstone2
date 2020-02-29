# -*- coding: utf-8 -*-
"""
Created on Thu Feb 13 14:30:43 2020

@author: tjnr4c
"""

import paho.mqtt.client as mqtt
import time
import random as rand

devices = []

def insertToDb(deivceId, timestamp, sensorNum, output):
    print(deivceId + ":" + timestamp + ":" + sensorNum + ":" + output)
    client.publish("/" + deivceId, "get")

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+ str(rc))

    client.subscribe("/info") #subscribed to allow commands to be called on logic server
    client.subscribe("/connected") #subscribed to get devices that connect
    #client.subscribe("/data")

# The callback for when a PUBLISH message is received from the server.
def on_message(client0, userdata, msg):
    global client
    print("MESSAGE")
    if msg.topic == "/connected":
        newDevice = str(msg.payload).replace('\'', '').replace('b', '', 1)
        if newDevice not in devices:
            channel = "/" + newDevice + "/data"
            print(channel)
            client.subscribe(channel) #subscribe to device data stream
            devices.append(newDevice)
            print(newDevice + " Connected")

    elif msg.topic == "/info":
        command = str(msg.payload).replace('\'', '').replace('b', '', 1).lower()
        if command == "getdevices":
            print(devices)
        elif command == "getchannels":
            for i in devices:
                print("/" + i + "/data")

    else:
        cleanedPayload = str(msg.payload).replace('\'', '').replace('b', '', 1).lower()
        parts = cleanedPayload.split(',')
        insertToDb(parts[0], parts[1], parts[2], parts[3])

client = mqtt.Client(client_id="ls002")
client.username_pw_set("mqtsqrfd", "qWsfSyHmt1D-")
client.on_connect = on_connect
client.on_message = on_message

client.connect("hairdresser.cloudmqtt.com", 17102, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()