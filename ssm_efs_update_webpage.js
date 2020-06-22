var AWS = require("aws-sdk");

class EfsList {
    constructor(instance_id='i-0a23e18c84b5d2c04') {
        this.instance_id = instance_id;
        this.mount = "sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-88888888.efs.us-east-1.amazonaws.com:/ /mnt"
    }        

    get_params(cmd) {
        const params = {
            InstanceIds:[this.instance_id],
            DocumentName:"AWS-RunShellScript",
            Parameters: {commands: [cmd] }
        };

        return params
    }

    async mount_efs() {
            AWS.config.update({region: 'us-east-1'})   
            const ssm = new AWS.SSM();
            await ssm.sendCommand(this.get_params(this.mount),(err,data) => {                             
            setTimeout(() =>  this.get_command_exec_results(data.Command.CommandId), 10000);                                 
       });
        
    }       

    async list_efs_share(cmd)  {
            AWS.config.update({region: 'us-east-1'})        
            const ssm = new AWS.SSM();
            await ssm.sendCommand(this.get_params('sudo ls /mnt'),(err,data) => {                                                      
            const results = setTimeout(() =>  this.get_command_exec_results(data.Command.CommandId),  10000);               
            
       });

    };

    async get_command_exec_results(command_id) {        
        const ssm = new AWS.SSM();
        const params = {CommandId:command_id,InstanceId:this.instance_id}            
        try {
            await ssm.getCommandInvocation(params,(err,data) => {                    
                if (data.StandardOutputContent) {      
                    // get html insert string          
                    //console.log(data)
                    const file_list = data.StandardOutputContent.split('\n')
                    const new_array = file_list.map(curr => this.render_list(curr))                    
                    console.log(new_array.join(''))                                         
                }              
            });
        } catch(error) {
            console.log("error")
    }}       

    render_list(item) {
    if (item !== '') {
        const html = `<li>${item}</li>`
        return html 
    }}};     


//Elliott Arnold - learning js quick and dirty
//Using JS to access data from EFS filesystem; genearate html sting to send to browser
//6-22-20

efs = new EfsList()
efs.list_efs_share()
