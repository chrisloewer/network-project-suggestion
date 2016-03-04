# network-project-suggestion
Internet of Things suggestion for Network Security capstone class at Letu


### Root Problem

Life never stays at home, and when we are home we spend a lot of time changing settings on our devices. Finding a way to control the power of your home remotely and the environment when you are home would help a lot.


### Project Proposal

Create a simple system where several individual power sources can be turned on and off remotely over the network.  This will entail building 'smart' power strips, a central server to control the state of the power strips, and an app to communicate with the central server.

###### Smart Power Strips

A Raspberry Pi has pins with power out meaning that it would be possible to flip a switch with a relay.  This would take some research to figure out, but it would be possible.  It is also possible to connect a pi to a network.

###### Central Server

This would keep track of the current status of the power strips (whether they are on or off).  It would also communicate with the smart power strips to toggle their current state.

###### App

This would either be a web app or a mobile application to communicate with the central server.  Its goal would be to provide a simple intuitive GUI.


### Challenges

Outline of some of the possible pain points (risks) to overcome

###### Turn power strip on/off

Figure out how to wire up a Raspberry Pi or similar device to turn a power strip on or off on command.

###### Keep track of IP addresses

Be able to find the smart power strips on the network even with changing IP addresses and keep track of which one is which.

###### Remotely communicate with strips

Be able to talk to the strips from the central server and receive confirmation.

###### Communicate with server from app

Be able to send packets from a mobile device.
