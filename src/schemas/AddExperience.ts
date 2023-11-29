import { list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  file,
  checkbox,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { calendarDay } from "@keystone-6/core/fields";


function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 30;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i.toString());
    }
    return years;
  }



const yearsData = generateArrayOfYears();

const releventMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


export default list({
  access: allowAll,
  fields: {
    title: text(),
    employment_type: select({
      options: [
        { label: "FullTime", value: "fullTime" },
        { label: "PartTime", value: "partTime" },
        { label: "SelfEmployed", value: "selfEmployed" },
        { label: "Freelance", value: "freelance" },
        { label: "Internship", value: "internship" },
        { label: "Trainee", value: "trainee" },
        // Add more roles as needed
      ],
    }),
    company: text(),
    location: text(),
    location_type: select({
      options: [
        { label: "remote", value: "remote" },
        { label: "office", value: "office" },
        // Add more roles as needed 
      ],
    }),
    currently_working: checkbox({
        defaultValue: false,
      }),
     start_year : select({
        options: yearsData
      }),
     start_year_month : select({
        options: releventMonths
      }),
     end_year : select({
        options:yearsData
      }),
     end_year_month : select({
        options: releventMonths
      })
  },
});
