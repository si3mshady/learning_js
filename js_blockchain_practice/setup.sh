#!/bin/bash

#update EC2 & prepare syste installing node npm on EC2 instance 
sudo yum update -y
sudo yum install -y gcc-c++ make
sudo yum install httpd -y
sudo chkconfig httpd on
sudo service httpd start
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install nodejs -y
chmod +x  /home/ec2-user/.nvm/nvm.sh
/home/ec2-user/.nvm/nvm.sh
nvm install node
sudo node -e "console.log('Running Node.js ' + process.version)"
echo export  NODE_URL=$(curl http://169.254.169.254/latest/meta-data/public-ipv4) >>  ~/.bashrc
export  NODE_URL=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)
sudo cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.bak
sudo sed -i 's/AllowOverride None/AllowOverride ALL/g' /etc/httpd/conf/httpd.conf #critical 
mkdir decentralized
cd decentralized/

NewFile=package.json
(
cat <<'ADDTEXT4'
{
  "name": "decentralized_network_practice",
  "version": "1.0.0",
  "description": "",
  "main": "decentralized.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2",
    "express": "^4.17.1",
    "request": "^2.88.2",
    "request-promise": "^4.2.5",
    "request-promises": "^1.1.0"
  }
}

ADDTEXT4
) > $NewFile

sudo npm install
wget https://raw.githubusercontent.com/si3mshady/learning_js/master/js_blockchain_practice/decentralized.js
node decentralized.js



