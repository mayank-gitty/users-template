import React, { useState } from "react";
import { useForm, FormErrors } from "@mantine/form";

// ...

const AddTimeLine = ({ AllProjects }: any) => {
  const form = useForm({
    initialValues: {
      userId: "",
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          key: 0,
        },
      ],
      date: new Date(),
    },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const addEntry = () => {
    form.insertListItem("entries", {
      userName: "",
      mobileNumber: "",
      email: "",
      address: "",
      key: randomId(),
    });
  };

  const saveAll = async () => {
    const validationErrors: FormErrors = {};

    if (!form.values.date) {
      validationErrors.date = "Date is required";
    }

    form.values.entries.forEach((entry, index) => {
      if (!entry.userName) {
        validationErrors[`entries.${index}.userName`] = "User Name is required";
      }
      if (!entry.mobileNumber) {
        validationErrors[`entries.${index}.mobileNumber`] = "Mobile Number is required";
      }
      if (!entry.email) {
        validationErrors[`entries.${index}.email`] = "Email is required";
      }
      if (!entry.address) {
        validationErrors[`entries.${index}.address`] = "Address is required";
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit the data
      // ...

      // Redirect or perform other actions
      router.push('/multi_users_table');
    } else {
      // Form is invalid, show validation errors
      setFormErrors(validationErrors);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => {})}>
        {/* ... your form inputs ... */}

        {/* Display validation errors next to the corresponding input fields */}
        {formErrors.date && <div className="text-red-600">{formErrors.date}</div>}
        {form.values.entries.map((entry, index) => (
          <div key={entry.key}>
            {formErrors[`entries.${index}.userName`] && (
              <div className="text-red-600">{formErrors[`entries.${index}.userName`]}</div>
            )}
            {formErrors[`entries.${index}.mobileNumber`] && (
              <div className="text-red-600">{formErrors[`entries.${index}.mobileNumber`]}</div>
            )}
            {formErrors[`entries.${index}.email`] && (
              <div className="text-red-600">{formErrors[`entries.${index}.email`]}</div>
            )}
            {formErrors[`entries.${index}.address`] && (
              <div className="text-red-600">{formErrors[`entries.${index}.address`]}</div>
            )}
          </div>
        ))}

        {/* ... the rest of your component ... */}
      </form>
    </>
  );
};

// ...

export default AddTimeLine;
