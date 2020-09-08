const vpcButton = document.getElementById('vpc').firstElementChild
const ec2Button = document.getElementById('ec2').firstElementChild
const secGButton = document.getElementById('secG').firstElementChild
const iamButton = document.getElementById('iam').firstElementChild

const sideBarHandler = document.getElementById('sideBar')
const sideBarContentHandler = document.getElementById('content')
const api_url ="https://06xluu9pu2.execute-api.us-east-1.amazonaws.com/testing/instances"

console.log(sideBarHandler)

const showSideBar = () => {
    sideBarHandler.style.width = "20%"
}

const closeSideBar = () => {
    sideBarHandler.style.width = "0%"
}

sideBarHandler.addEventListener('click',() => {
    closeSideBar()
    sideBarContentHandler.innerHTML = ""
})

// need to create an api and fetch data into the sidebar 
vpcButton.addEventListener('click', () => {    
    vpcButton.classList.toggle("modify_color")       
   setTimeout(() => {
       showSideBar()
       axios.get(api_url)
        .then(res => {                                    
            console.log(res.data)            
            let count = res.data.VPC             
           // sideBarHandler.insertAdjacentHTML("beforeend","<li> Instances </li> <li> Count</li> ")
           sideBarContentHandler.innerHTML = `<p> VPCS </p> <p> Count: ${count} </p>`
        }).catch(err => {
            console.log(err)
        })

   }, 1000)
})

ec2Button.addEventListener('click', () => {    
    ec2Button.classList.toggle("modify_color")       
    setTimeout(() => {
        showSideBar()
        axios.get(api_url)
        .then(res => {                                    
            console.log(res.data)            
            let count = res.data.EC2                      
           sideBarContentHandler.innerHTML = `<p> Instances </p> <p> Count: ${count} </p>`
        }).catch(err => {
            console.log(err)
        })

   }, 1000)
})

secGButton.addEventListener('click', () => {       
    secGButton.classList.toggle("modify_color")       
    setTimeout(() => {
        showSideBar()
        axios.get(api_url)
        .then(res => {                                    
            console.log(res.data)            
            let count = res.data.SecurityGroups                      
           sideBarContentHandler.innerHTML = `<p> Security Groups </p> <p> Count: ${count} </p>`
        }).catch(err => {
            console.log(err)
        })

   }, 1000)
})

iamButton.addEventListener('click', () => {    
    iamButton.classList.toggle("modify_color")       
    setTimeout(() => {
        showSideBar()
        axios.get(api_url)
        .then(res => {                                    
            console.log(res.data)            
            let count = res.data.IAM                       
           sideBarContentHandler.innerHTML = `<p> IAM Users </p> <p> Count: ${count} </p>`
        }).catch(err => {
            console.log(err)
        })

   }, 1000)
})

//AWS Lambda API Gateway CSS Vanilla JS HTML practice
//Tinkering with animations (hues), flex-box, event handlers and laying out HTML 
//Click an icon to view a small animation, extending a side bar with counts:
// EC2, IAM Users, VPCs, Security Groups 
// Elliott Arnold 9-7-20   DMS DFW Covid-19  VOTE
