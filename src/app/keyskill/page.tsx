// import React, { useState } from 'react';
// import {
//   Button,
//   Container,
//   Divider,
//   Grid,
//   Group,
//   Input,
//   Paper,
//   Select,
// } from '@mantine/core';

// const KeySkills = () => {
//   const [formData, setFormData] = useState({
//     skillName: '',
//   });

//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [selectedSkillOption, setSelectedSkillOption] = useState('');

//   const handleChange = (field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleSkillOptionClick = (skill) => {
//     setSelectedSkillOption(skill);
//     handleChange('skillName', skill);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//   };

//   const handleCancel = () => {
//     // Reset the form
//     setFormData({
//       skillName: '',
//     });
//     setSelectedSkillOption('');
//   };

//   // List of skill options
//   const skillOptions = ["Java", "Python", "React", "CSS", "HTML", "JavaScript"];
  
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Container size="xs" px="xs">
//         <Paper shadow="xl" p="md">
//           <h6 style={{ textAlign: 'left', fontSize: '20px' }}>
//             Key Skills<span style={{ color: 'green' }}> Add 8%</span>
//           </h6>
//           <p style={{ color: 'GrayText' }}>
//             Tell recruiters what you know or what you are known for, e.g., Direct Marketing, Oracle, Java, etc. We will send you job recommendations based on these skills. Each skill is separated by a comma.
//           </p>

//           <Divider my="sm" />

//           <form onSubmit={handleSubmit}>
//             <Grid>
//               <Grid.Col span={12}>
//                 <Input.Wrapper
//                   label="Skill / software name"
//                   styles={() => ({
//                     label: {
//                       color: '#01041b',
//                       fontSize: '1.2em',
//                       fontWeight: 500,
//                       lineHeight: 1.2,
//                       marginBottom: 10,
//                     },
//                   })}
//                 >
//                   <Input
//                     placeholder="Skill / software name"
//                     required
//                     value={formData.skillName}
//                     onChange={(e) => handleChange('skillName', e.target.value)}
//                   />
//                 </Input.Wrapper>
//               </Grid.Col>
//               <Grid.Col span={12}>
//                 <div>
//                   {skillOptions.map((skill, index) => (
//                     <Button
//                       key={index}
//                       style={{
//                         marginRight: '10px',
//                         marginBottom: '10px',
//                         backgroundColor: selectedSkillOption === skill ? 'blue' : 'gray',
//                       }}
//                       onClick={() => handleSkillOptionClick(skill)}
//                     >
//                       {skill}
//                     </Button>
//                   ))}
//                 </div>
//               </Grid.Col>
//               <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
//                 <Group position="right" mt="md">
//                   <Button
//                     type="button"
//                     style={{
//                       height: '50px',
//                       width: '120px',
//                       borderRadius: '8px',
//                       backgroundColor: 'gray',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       fontSize: '16px',
//                       color: '#FFFFFF',
//                       marginRight: '10px',
//                     }}
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     style={{
//                       height: '50px',
//                       width: '120px',
//                       borderRadius: '8px',
//                       backgroundColor: 'red',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       fontSize: '16px',
//                       color: '#FFFFFF',
//                     }}
//                   >
//                     Save
//                   </Button>
//                 </Group>
//               </Grid.Col>
//             </Grid>
//           </form>
//           {formSubmitted && (
//             <div style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
//               Form submitted successfully!
//             </div>
//           )}
//         </Paper>
//       </Container>
//     </div>
//   );
// }

// export default KeySkills;

import React, { Component } from 'react';

class MultiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      inputValues: [''],
    };
  }

  handleOptionChange = (event) => {
    const options = event.target.options;
    const selectedOptions = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }

    this.setState({ selectedOptions });
  };

  handleInputChange = (event, index) => {
    const newInputValues = [...this.state.inputValues];
    newInputValues[index] = event.target.value;

    this.setState({ inputValues: newInputValues });
  };

  addInputField = () => {
    this.setState((prevState) => ({
      inputValues: [...prevState.inputValues, ''],
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedOptions, inputValues } = this.state;

    // You can process the selected options and input values here
    console.log('Selected Options:', selectedOptions);
    console.log('Input Values:', inputValues);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Multi-Select */}
        <label>Select Multiple Options:</label>
        <select
          multiple
          onChange={this.handleOptionChange}
          value={this.state.selectedOptions}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        {/* Multi-Input */}
        <label>Input Multiple Values:</label>
        {this.state.inputValues.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              value={value}
              onChange={(event) => this.handleInputChange(event, index)}
            />
          </div>
        ))}
        <button type="button" onClick={this.addInputField}>
          Add Input Field
        </button>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default MultiForm;
