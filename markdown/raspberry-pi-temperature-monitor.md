---
{
    "title": "Raspberry pi Temperature Monitor",
    "shortTitle": "tempmon",
    "summary": "no code, yet",
    "created": "2014-06-26",
    "modified": "2014-06-26",
    "type":"general",
    "categories": [
        "tech"
    ],
    "tags": [
        "microcontroller","code","logging"
    ]
}
---
I wanted to build a wireless arduino temperature logger. Well, I did. Except it was a rasberry pi and it logged to 
google drive. it was awesome. BUT! i lost the code. No worries, though. Here are my notes. I will clean this up soon...

I bought a raspberry pi and a DHT11 temperature/humidity sensor. Hooked it up and ran it. I used software/instructions from:

https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/software-install-updated

The sensor is accurate to 2 degrees C. It takes 2 seconds to get a reading and it isn’t as accurate as the DHT22. But, it was what was in stock at gateway so I used it and am logging data to a google spreadsheet via this code:


> import sys
>
> import gspread
>
> import Adafruit_DHT
>
> import time
>
> import datetime
> 
> gc = gspread.login('daisy.wood@gmail.com', ‘password’)
>
> sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1RIvyUzV--PWNfihjMS4OZQD9JKXuPZHTgXKVSc5GCnE/edit?usp=sharing')
>
> worksheet = sh.get_worksheet(0)
>
> sensor = Adafruit_DHT.DHT11
>
> pin = 4
> 
> for x in range(2,2000):
>
>     humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
> 
>     if humidity is not None and temperature is not None:
>
>         print 'Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity)
> 
>         worksheet.update_cell(x, 1, datetime.datetime.now().strftime("%Y-%m-%d"))
>
>         worksheet.update_cell(x, 2, datetime.datetime.now())
>
>         worksheet.update_cell(x, 3, temperature)
>
>         worksheet.update_cell(x, 4, humidity)
>
>     else:
>
>         print 'Failed to get reading. Try again!'
>     
>     time.sleep(60)
> 
LOL, i need to get code formatting figured out on this site..

Here is the ardunio library and example code:
<http://learn.adafruit.com/dht>

BUT,  probably want to do what this guy is doing:
<http://blog.the-jedi.co.uk/tag/nrf24l01/>

In fact, that’s the direction I want to go in. He does use the same temp sensor, which is guess is fine. But, he uses nrf24L01+ and an arduino so that’s the next step I suppose.

This is good, he uses protobufs:
<http://theboredengineers.com/2014/01/piweather-how-to-communicate-wirelessly-between-an-arduino-and-a-raspberry-pi/>

As for WIRED communication between an arduino and raspberry, 
<http://arduino.stackexchange.com/questions/1628/arduino-to-raspberry-pi-wired-communication>

thank you for playing.
