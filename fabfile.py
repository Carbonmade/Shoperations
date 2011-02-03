import os
from fabric.api import run, sudo, put, env, local

def production():
    env.hosts = ['ec2-204-236-210-184.compute-1.amazonaws.com']
    env.user = "ubuntu"
    env.key_filename = [os.path.join(os.getenv("HOME"), '.ssh', 'node.pem')]

def deploy():
    local('git push origin master')
    run('cd /home/ubuntu/Shoperations && git pull origin master')
    restart()

def restart():
    run('/home/ubuntu/node/local/bin/forever stopall')
    run('/etc/init.d/shoperations')
    run('forever list')
    sudo('/etc/init.d/nginx stop')
    sudo('/etc/init.d/nginx start')