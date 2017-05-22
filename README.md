# Description :

This is a simeple nodejs script to monitor raspberry pi cpu temperature remotely.

This runs as a autostarting service on raspberry pi which meausures cpu temperature and posts to a configured mqtt broker topic
Note : you can configure your broker and topic in app.properties

I use mqtt-spy to monitor and generate the graphs

Feel free to get in touch with me if you are having any issues with using this by opening an issue.

### pictorial overview 

![Alt text](/img/pi_temp_logger.png?raw=true)



# To install the application

### Step 0 : login to raspberry pi

`ssh piuser@192.168.0.101`

_Ex: 'ssh piuser@pi2' here piuser is the user you created during installation of raspberry pi and pi2 is the hostname of your raspberry pi. if you are using a IP address, you can use it instead_


### Step 1 : Check out the project in to your home directory

`cd ~/git `

Note: if "~/git" doesnt exist create it using "mkdir ~/git" command

`git clone <git url >`

### Step 2 : Copy the project file in to your /usr/local/bin and make the main file executable
```
sudo cp ~/git/pi_temp_logger/ /usr/local/bin/pi_temp_logger/
sudo chmod a+x /usr/local/bin/pi_temp_logger/main.js
```
### Step 3 : Change permissons of all file so that the service user can execute them. 
_ **Note :** if your raspberry pi user is different from 'pi', for Ex: 'johndoe' then replace pi with johndoe in below commands _
```
cd /usr/local/bin/pi_temp_logger/
sudo chown -R pi:pi *
```
### Step 4 : Download all nodejs dependencies that are needed to run the project
```
sudo npm install
```
### Step 5 : Enable and start the service
```
sudo systemctl enable /usr/local/bin/pi_temp_logger/pitemplogger.service
sudo systemctl start pitemplogger
```
### Step 6 : Check the service status
```
sudo systemctl status pitemplogger
```
_**Note :** One of the most likely reasons for service startup failure are_
* _Nodejs not installed properly_
* _File permissions are not properly set_

Screenshot of Pi temperature monitoring using mqtt-spy https://github.com/eclipse/paho.mqtt-spy

![Alt text](/img/ScreenShot.png?raw=true "Pi temperature monitoring with this script and mqtt-spy")

# License (MIT): 

Copyright (c) 2017 Uday G

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
