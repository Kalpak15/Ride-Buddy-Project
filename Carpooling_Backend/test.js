const axios = require("axios");

async function test() {
    const requests = [];

    for(let i=0; i<20; i++) {
        requests.push(
            axios.post(
                "http://localhost:3000/api/v1/create-passenger-ride/69f60a569af9db84ab05da33",
                
                {
                    seats: 1,
                    start: "A",
                    destination: "B"
                },
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWY0ZDU0ZGJmZjJkNmFjZTNkNjI1YzMiLCJlbWFpbCI6ImNvbGxlZ2V2aXJhdDA3QGdtYWlsLmNvbSIsInVzZXJQaG9uZU5vIjoiOTk5OTk5OTk5OSIsIm5hbWUiOiJLYWxwYWsgS3Vsa2FybmkiLCJpYXQiOjE3Nzg1ODY4OTYsImV4cCI6MTc3ODU5NDA5Nn0.qtq4ctc9ESlc9RlYa2rIl3jf2M1qmniaESpo0HJDWy0"
                    }
                }
            )
        );
    }

    const results = await Promise.allSettled(requests);

    console.log(results);
}

test();