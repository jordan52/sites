---
{
    "title": "Interfacing an AVR with an ISA Nic",
    "shortTitle": "AVR ISA",
    "summary": "My first microcontroller project",
    "created": "2002-2-10",
    "modified": "2014-12-10",
    "type":"general",
    "categories": [
        "tech"
    ],
    "tags": [
        "avr","microcontroller","circuits"
    ]
}
---
 ![](/media/avr-1.jpg)
 
  (This was written in early 2002)
 
 I'd been wanting to play with some embedded systems for quite some time
but didn't really know where to start and didn't have any impressive
ideas. I mean, really, how many computer controlled thermostats or robots does this world need. 

 One day I ran across the [worlds smallest web
server](http://www-ccs.cs.umass.edu/~shri/iPic.html). I thought this was
pretty cool and wondered just how hard it would be to internet-enable
something with an embedded web server. I went out and bought a
[TINI](http://www.ibutton.com/TINI/) to play with some ideas, but it was
back ordered... for 3 months. While I was waiting i found the [\$25 web
server](http://www.chipcenter.com/circuitcellar/july99/c79bl1.htm) and
thought, what the hell, I can do that. 
 
 I went out and bought me an STK-500 developer board and an Atmel
AT90S8515 8-bit microcontroller chip. Good times... I needed to do
something easy with it to get started, so I bought an LCD from a surplus
electronics place. It was easy enough to wire up the LCD and write some
assembly and C programs to display clever messages to impress my
friends.
 
 Anyway, I decided it was time to wire up an old 3com ISA ethernet card
I got for free from [work](http://www.lwm.com) and try to
"internet-enable" something. I couldn't think of anything cool to hook
up so I as stuck.
 
 Then I ran across
[this](http://dave.47jane.com/ee281/dclausen_ee281_writeup.pdf).
 HOT DAMN!!! hooking a nic to an avr and an lcd to display udp messages
sent to the nic's IP.. how perfect is that?  Thanks Dave,
whomever you are. 
  
 So, I used that PDF (careful, there are mistakes in there) and info
from  
 the $25 web server page to wire everything up. It didn't work. Imagine
that. Well, whoever didn't put in big bold letters: **'Hey dumbass, you
need an ne2000 card.**' needs to get shot. My 3com card is not ne2000,
whatever the hell that means. So, i got one off ebay for \$1.99, plugged
it in, turned it on and BOOM! the freakin' thing works. 
  
 Here's what it does. You compile the IP address in the code and
download it to the avr. When you turn it on, the chip initializes the
nic and the lcd. It probes the card for a mac address and displays that
plus the IP on the LCD. It then sits and listens on port 987 for a UDP
packet. When it gets a packet, it decodes it and sends the data to the
LCD. I wrote a little java app that will take in a string and send it to
an IP using UDP. When you hit send, the message appears on the LCD. How
cool is that? 
  
 ![](/media/avr-2.jpg) 
  
 ![](/media/avr-3.jpg) 
  
 Here's some of Dave's code: 
 ; we have now advanced the read pointer up to the first byte of 
 ; the "data" portion of the IP packet 
 ; ok, now look back at the protocol field and jump to the right 
 ; code to handle the packet type 
 ldi r18,1 ;icmp 
 cp r19, r18 
 breq ne2k\_read\_packet\_icmp
 ldi r18,6 ;tcp
 cp r19, r18
 breq ne2k\_read\_packet\_tcp
 ldi r18, 17 ; udp
 cp r19, r18
 breq ne2k\_read\_packet\_udp
 
 right... needless to say I didn't write any of the code behind this
project. I did have to modify it to get it to work, though... 
  
 The nic cost \$2, \$8 for the microcontroller, and \$10 for the LCD.
Everything else I bought I didn't really need (like the STK-500,
breadboard, perfboard, dirty hookers, etc.) but it sure as hell made
life much easier. 
  

That's great. Now what?
-----------------------

Now that I've figured out how to work with microcontrollers, and getting
some random device to respond to commands sent through the internet I'm
well on my way to finally getting my toaster to burn my english muffins
from the other side of the planet. 
