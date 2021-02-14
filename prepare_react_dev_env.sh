#!/bin/bash

url=https://raw.githubusercontent.com/si3mshady/learning_js/master/tidy_react_app.py
echo "Ready for launch"
echo "Enter React Project Name"
read projectName

npm init -y && \
npx create-react-app $projectName && \
cd $projectName && \
wget $url && \
python tidy_react_app.py
