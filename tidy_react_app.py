import re, os, glob, subprocess


def cleanUpAppJS(pattern, replacement):  
    with open('src/App.js', 'r') as app:
        fileContent = app.read()
        result = re.sub(pattern, replacement, fileContent)       

        with open('src/App.js', 'w') as ink:
            ink.write(result)

def cleanIndexJS():

    cmd = "sed -i \"\" 's/registerServiceWorker();//g' src/index.js"
    res = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)

    patterns = {"import registerServiceWorker from './registerServiceWorker';":''}
    
    for pattern, repl in patterns.items():
       
        with open('src/index.js') as index:
            fileContent = index.read()
            result = re.sub(pattern, repl, fileContent)            
            with open('src/index.js', 'w') as ink:
                ink.write(result)
                
def createComponentsDirectory():
    os.makedirs('src/components')


def removeFiles():
    allFiles = glob.glob('src/*')   
    for file in allFiles:        
        if 'test' in file or 'svg' in file or 'register' in file:
            os.remove(file)


def begin():
    patterns = {"\<div ([\S \s]+) <\/div>":"<div className='App'> </div>", \
    "import logo from './logo.svg';":'' }

    for pattern, repl in patterns.items():
        cleanUpAppJS(pattern, repl)

    cleanIndexJS()    
    removeFiles()
    createComponentsDirectory()
   

if __name__  == "__main__":
  begin()
