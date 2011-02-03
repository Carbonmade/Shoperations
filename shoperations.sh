#! /bin/sh
# /etc/init.d/shoperations
#
#   This script starts Shoperations when the server boots.
#
#   To install:
#       sudo ln -s /home/ubuntu/Shoperations/shoperations.sh /etc/init.d/shoperations
#       sudo chmod +x /etc/init.d/shoperations
#       update-rc.d shoperations defaults
#
#   To remove from boot sequence:
#       update-rc.d -f shoperations remove
#
forever start -o /home/ubuntu/Shoperations/log/console.log -e /home/ubuntu/Shoperations/log/error.log /home/ubuntu/Shoperations/app.js