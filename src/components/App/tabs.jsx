



import { Modal, Button, Tab, Nav, Form } from 'react-bootstrap';

// for Tabs ( Separating Data Fields)
const [key, setKey] = useState('companies');
const handleTabSelect = (selectedKey) => {
    setKey(selectedKey);
    setValidationErrors({});
};

const [validationErrors, setValidationErrors] = useState({});
const [formData, setFormData] = useState({});



// in getFormValue
// add this

setFormData({ ...formData, [e.target.name]: e.target.value });

// in submitFormData
// add this 
// Perform validation
const errors = {};
if (key === 'companies') {
    if (!formData.projectID) {
        errors.projectID = 'Project ID is required';
    }
    if (!formData.companyCodeID) {
        errors.companyCodeID = 'Company Code is required';
    }
    if (!formData.companyCodeDescription) {
        errors.companyCodeDescription = 'Company Description is required';
    }
} else if (key === 'projectDescription') {
    if (!formData.projectDescription) {
        errors.projectDescription = 'Project Description is required';
    }
} else if (key === 'location') {
    if (!formData.validFrom) {
        errors.validFrom = 'Valid From Date is required';
    }
    if (!formData.regionalLocation) {
        errors.regionalLocation = 'Regional Location is required';
    }
    if (!formData.companyCodeID) {
        errors.companyCodeID = 'Company Code is required';
    }
}

if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    return;
}




//// Disable Buttons Until all required fields are filled..................................

// new added::
const [addError, setAddError] = useState('');
const [formValid, setFormValid] = useState(false);
const [editFormValid, setEditFormValid] = useState(false);
const [updateError, setUpdateError] = useState('');


function validateForm(project) {
    // Check if all required fields are filled
    if (
        project.projectID &&
        project.companyCodeID &&
        project.companyCodeDescription &&
        project.projectDescription &&
        project.validFrom &&
        project.regionalLocation
    ) {
        return true;
    }
    return false;
}

// add these to getFormValue function for add modal
// new:;
// Check form validity
const isValid = validateForm(myProject);
setFormValid(isValid);


// add these to handleUpdate function for update modal
// Check form validity before updating
if (!editFormValid) {
    return
}


// add this useEffect 
useEffect(() => {
    if (selectedProject) {
        const isValid = validateForm(selectedProject);
        setEditFormValid(isValid);
    }

}, [selectedProject]);


// this button for update 
<Button variant="primary" disabled={!editFormValid} onClick={() => handleUpdate(selectedProject)} >
Update
</Button>

// this button for add 

{/* <button type="submit" className={`w-100 ${style.imageButton}`} disabled={!formValid}>Add Project</button> */}


// add this in add modal

  {/* new */}
{/* {addError && <div className="alert alert-danger m-3 p-2">{addError}</div>} */}




