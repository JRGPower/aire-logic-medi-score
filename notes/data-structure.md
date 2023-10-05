## Data structure

I was unsure how to interpret the Enum(integer) types in the instructions. My understanding is that these data types would look something like this:

{ALERT: 0,
CVPU:3}

{AIR: 0,
OXYGEN: 2}

I found it unclear from the examples whether a set of observtions would be passed to the required function with the string or value from the enum, so I am not sure how to implement the enums directly in the system I have been building.

To simplify I am using a boolean property in my data structure to represent each of these observation measurements:
(Also for CGB - Fasting)

| Prop        | Bool         | Score |
| ----------- | ------------ | ----- |
| oxygen:     | True / False | 0 / 2 |
| cvpu:       | True / False | 0 / 3 |
| cbg.fasting | True / False | / N/A |

I'm using mongodb to store and persist some observation data to simulate a system that would use the Medi-Score calculation.

This is the full object Schema interpreting the observations data form the intructions:

```{
    {
      patientId: { type: String, required: true },
      observation: {
        oxygen: { type: Boolean },
        cvpu: { type: Boolean },
        respirationRate: { type: Number },
        spO2: { type: Number },
        temperature: { type: Number },
        cbg: { value: { type: Number }, fasting: { type: Boolean } },
        time: { type: Date },
        comments: { type: String },
        },
      },
    { timestamps: true }
}
``````
See also ./models/record.js
