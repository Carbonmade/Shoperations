import os
from fabric.api import run, sudo, put, env

def production():
    env.hosts = ['ec2-204-236-210-184.compute-1.amazonaws.com']
    env.user = "ubuntu"
    env.key_filename = [os.path.join(os.getenv("HOME"), '.ssh', 'node.pem')]

def deploy():
    run('cd /home/ubuntu/Shoperations && git pull origin master')
    run('/home/ubuntu/node/local/bin/forever stopall')
    run('/etc/init.d/shoperations')
    run('forever list')