# Belly Button Biodiversity Dashboard

## Introduction
This project builds an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogues the microbes that colonise human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The dashboard includes visualizations of the top 10 microbial species found in each individual, as well as a bubble chart and a gauge chart.

## Files
The following files are included in this project:

- `index.html`: The main HTML file to display the interactive dashboard.
- `app.js`: The JavaScript file containing the code for creating the interactive charts and visualizations.
- `samples.json`: The JSON file containing the Belly Button Biodiversity dataset.

## Usage
To run the project, simply open the `index.html` file in a web browser. 

All necessary dependencies, such as D3.js and Plotly.js, are loaded in the `index.html` file.

## Results

![belly-button-challenge](https://user-images.githubusercontent.com/108673720/231171528-5e89dbce-c3b4-4ff5-bfb0-9b6dad4e1e5a.png)

### Bar Chart
The bar chart displays the top 10 OTUs found in a selected individual. The chart is updated when a different individual is selected from the dropdown menu.

### Bubble Chart
The bubble chart displays all OTUs found in a selected individual, with the size of the bubbles representing the abundance of each OTU and the color representing the OTU ID.

### Gauge Chart
The gauge chart displays the selected individual's belly button washing frequency in scrubs per week.

## Conclusion
Thank you for checking out the Belly Button Biodiversity Dashboard! If you have any questions or feedback, feel free to reach out to me.
