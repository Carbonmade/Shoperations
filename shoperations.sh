#! /bin/sh
# /etc/init.d/shoperations
#
#   This script starts Shoperations when the server boots.
#
#   To install:
#       sudo ln -s /home/ubuntu/Shoperations/shoperations.sh /etc/init.d/shoperations
#       sudo chmod +x /etc/init.d/shoperations
#       sudo update-rc.d shoperations defaults
#
#   When installing, you might see a message: update-rc.d: warning: /etc/init.d/shoperations missing LSB information
#   You can safely ignore that. It's just complaining that this script doesn't offer the normal {start|stop|restart} commands.
#
#   To remove from boot sequence:
#       sudo update-rc.d -f shoperations remove
#
forever start -o /home/ubuntu/Shoperations/log/console.log -e /home/ubuntu/Shoperations/log/error.log /home/ubuntu/Shoperations/app.js