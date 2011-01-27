Shoperations is a [node.js](http://nodejs.org/) + [Express](http://nodejs.org/) app used to manage the Carbonmade store (backend).

# Setting up

## Node, Express & NPM

This sequence of commands will install the latest versions of node, [npm](https://github.com/isaacs/npm), and express:

    echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.profile
    . ~/.profile
    mkdir ~/local
    mkdir ~/node-latest-install
    cd ~/node-latest-install
    curl http://nodejs.org/dist/node-v0.3.6.tar.gz | tar xz --strip-components=1
    ./configure --prefix=~/local
    make install
    curl -# http://npmjs.org/install.sh | sudo sh
    curl -# http://expressjs.com/install.sh | sudo sh

(Adapted from [this gist](https://gist.github.com/579814#file_node_and_npm_in_30_seconds.sh))

Verify the installation worked with `node -v && npm -v && express -v` -- you should see output similar to this:

    v0.3.3
    0.2.14-2
    2.0.0-pre

## Dependencies

Shoperations makes use of the following Node modules:

* [jade](http://jade-lang.com/) ([TextMate bundle](https://github.com/miksago/jade-tmbundle))
* [less](http://lesscss.org/)
* [restler](https://github.com/danwrong/restler)

NPM modules can be installed with:

    npm install jade less
    
Restler is not in the npm repo, so you need to [clone from github](https://github.com/danwrong/restler) and manually install:

    git clone https://github.com/danwrong/restler.git
    cd restler
    npm install .
    
## Running Shoperations

    git clone git@github.com:Carbonmade/Shoperations.git
    cd Shoperations
    node dev.js
    
You should now be able to view Shoperations at [http://localhost:3000](http://localhost:3000)

Note that `node dev.js` should only be used for local development. Using `dev.js` allows for [auto-reloading](http://dracoblue.net/dev/hot-reload-for-nodejs-servers-on-code-change/173/) of Node/Express when JS files change. To run in production, `node app.js`.