---
{
    "title": "Turning an RC Transmitter Into A Flight Sim Controller",
    "shortTitle": "flight sim controller",
    "summary": "yep",
    "created": "2002-2-10",
    "modified": "2014-12-10",
    "type":"general",
    "categories": [
        "tech"
    ],
    "tags": [
        "circuits"
    ]
}
---
* * * * *

below you'll find how I used a transmitter as a joystick.. this link
lets you use the computer as the joystick to control the servos:\
 http://www.mh.ttu.ee/risto/rc/electronics/pc2rcv2.htm

* * * * *


I built and adapter to plug my airtronics vgr4 into my mic input so I
could use it to control the airplane in FMS (r/c airplane flight
simulator)

here are my notes:

### some adapters

futaba to usb:\
 http://www.milehighwings.com/usb\_cables.htm (autolearn, \$39)\
 http://www.geocities.com/simblaster/sbinstructions.html (cheesy, \$39)\
 or... airtronics vanguard fm vg4r\
 http://www.rc-circuits.com/ (buy it from these guys)\
 http://www.heliguy.com/nexus/fmsinterface.html (pictures of the
hookup)\

### alternative

build your own adapter to go from the 5 pin out on the back of the
transmitter to a 1/8th" phono plug you can plug into your mic input. Use
SmartPropoPlus to interface to FMS. It actually works. But, if you blow
something up (i broke a few things) it is not my fault.. if you try any
of this and something breaks, you are on your own.

### tips in an email i sent to someon

That's cool an old IBM keyboard plug will work. I dug for a while and
found one in my pile of junk. Wiring it up is easy. you need a mono
1/8th" plug. when you look at the back of the transmitter, you'll notice
the pins are rotated 1/4 turn clockwise. One wire hooks to the middle
(found at the 3 o'clock position) pin. The other wire hooks to the
bottom pin (near the 5 o'clock)

Sadly, i do not know which wire goes to the tip of the mono plug and
which goes to the sleeve (my ohms meter bit the dust last night so i
cannot check). But, i do know you can reverse them without blowing
anything up... it's just that the program can't read the joysticks when
it is backwards..

Download and install the flightsimulator from:

http://n.ethz.ch/student/mmoeller/fms/index\_e.html

I downloaded Version 2.0 Alpha 8.5 but i just noticed beta 7.0 is the
recommended version. you decide.

Find two apps. winmmppm.dll.zip can be found when searching for
SmartPropoPlus. I don't know where i found analyser31.exe... it was
written by philippe g. de coninck in 2004. It may be called Simple PCM
signal analyser v 3.1.

unzip winmmPPM.dll.zip and drop the dll into the FMS directory. (
C:\\Program Files\\FMS) This tells FMS how to use your transmitter as a
controller.

you'll use analyser31.exe to test your controller/mic input:

Plug the adapter into your mic input. Turn the transmitter on. Fiddle
with the volume controls until there is a loud, annoying noise coming
out of your speakers (you may want to mute the output)

Now start analyser31.exe.

click on the interface menu and select "Audio (MIC)"

now, click the "MONITOR" button near the bottom center. You'll see some
bars.. the bars should move around when you move the sticks. If not,
there's a problem (check your recording volumes, wired up backwards,
etc.) The bars are jittery and don't always center out. I think this is
normal.

Once you get something that looks about right, stop the MONITOR and
close the app. It is a crappy app.. you may have to reboot before it
will let go of the mic input and allow FMS to work.

Start FMS\
 click controls\
 click analog control.\
 highlight joysitck interface, click Resources.\

it should say "smartPropoPlus - general PPM" with 6 axes for Joystick 1.
If not, you somehow did not install the winmm dll file correctly.

if all is well, click OK

click mapping/calibration. Move the sticks around, they should move
those bar graphs around. Click calibrate and follow the instructions.
the bars should be moving along with your joysticks.

The Mapping section will define which channel is assigned to which
control and define if it is inverted or not. I do not know what Exp
means.

My mapping is:\
 rudder - 1\
 elevator - 3 - inverted\
 aileron - 2 - inverted\
 throttle - 4 - inverted.\

Your inverted settings may be different than mine.

Click OK.

Press "i" to reset the flight sim. Give the plane some gas and take off.
