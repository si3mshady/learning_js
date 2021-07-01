import re, os, glob, subprocess

def wipeCSS():
    cmd = "> index.css"
    cmd1 = "> src/App.css"
    cmd2 = "> src/index.css"
    for exec in [cmd,cmd1,cmd2]:
        subprocess.Popen(exec, stdout=subprocess.PIPE, shell=True)
    

def cleanUpAppJS(pattern, replacement):  
    with open('src/App.js', 'r') as app:
        fileContent = app.read()
        result = re.sub(pattern, replacement, fileContent)       

        with open('src/App.js', 'w') as ink:
            ink.write(result)

def executeSedCommands():
    cmdList = []
    cmd1 = "sed -i \"\" 's/registerServiceWorker();//g' src/index.js"
    cmd2 = "sed -i \"\" 's/reportWebVitals();//g' src/index.js"
    cmdList.append(cmd1)
    cmdList.append(cmd2)
    for cmd in cmdList:
        subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)


def cleanIndexJS():
    executeSedCommands()

    patterns = {"import registerServiceWorker from './registerServiceWorker';":''\
        ,"import reportWebVitals from './reportWebVitals';":""}
    
    for pattern, repl in patterns.items():
       
        with open('src/index.js') as index:
            fileContent = index.read()
            result = re.sub(pattern, repl, fileContent)            
            with open('src/index.js', 'w') as ink:
                ink.write(result)
                
def createComponentsDirectory():
    try:
        os.makedirs('src/components')
    except FileExistsError:
        pass


def removeFiles():
    allFiles = glob.glob('src/*')   
    for file in allFiles:        
        if 'test' in file or 'svg' in file or 'register' in file \
             or 'report' in file \
            or 'Test' in file:
            os.remove(file)


def begin():
    patterns = {"\<div ([\S \s]+) <\/div>":"<div className='App'> Clean Slate </div>", \
    "import logo from './logo.svg';":'' }

    for pattern, repl in patterns.items():
        cleanUpAppJS(pattern, repl)

    cleanIndexJS()    
    removeFiles()
    createComponentsDirectory()
    wipeCSS()
   

if __name__  == "__main__":
  begin()
