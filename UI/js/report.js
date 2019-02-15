if(!sessionStorage.token) {
	redirect:window.location.replace('./login.html');
}

const token = sessionStorage.token;
const incident_id = localStorage.recordId

reportDetails(incident_id);

function reportDetails(incident_id) {
	
	const root = 'http://127.0.0.1:5000/api/v2';
	const url  = `${root}/incidents/${incident_id}`;

	let options = {
        method: 'GET',
        headers: {
           'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    let request = new Request(url, options);

    fetch(request)
	.then(response => response.json())
    .then(data => {
        console.log(data);
		var item_count = Object.keys("product_details").length;
       
        if (item_count > 0){
            
            // set values
            const inc_id = data['incident_details']['incident_id'];
            const inc_comment = data['incident_details']['comment'];
			const latitude = data['incident_details']['latitude'];
			const longitude = data['incident_details']['longitude'];
            const inc_location = `${latitude} ${longitude}`;
            
        }
        else{
            alert("here "+data.message)
        }
                
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}