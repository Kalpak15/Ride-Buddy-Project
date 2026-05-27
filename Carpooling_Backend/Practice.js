const emailQueue = require("./Queues/emailQueue")




const test = async()=>{   
    
    const  jobs  = await emailQueue.getJobs();
    console.log("All Jobs:", jobs);

    const waitingjob = await emailQueue.getWaiting();
    console.log("Waiting Jobs:", waitingjob);
    
    const completedjob = await emailQueue.getCompleted();
    console.log("Completed Jobs:", completedjob);
    
    const failedjob = await emailQueue.getFailed();
    console.log("Failed Jobs:", failedjob);
    // await emailQueue.clean(0, 100, "failed");
    const  removefailedjob = await emailQueue.clean(0, 100, "failed");
    console.log("Removed Failed Jobs:", removefailedjob);

    const  total = await emailQueue.getJobCounts();
    console.log("Total Jobs:", total);

}

test()