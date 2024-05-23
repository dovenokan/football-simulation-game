document.addEventListener('DOMContentLoaded', function() {
    const ratingWeights = {'gk': 0, 'def': 0.35, 'pas': 0.10, 'dri': 0, 'fin': 0, 'sta': 0.10, 'str': 0.20, 'hed': 0.15, 'men': 0.10, 'iq': 0.10};
    const skillsContainer = document.getElementById('skills-container');
    const outputDiv = document.getElementById('output');

    // Create sliders for each skill
    const sliders = {};
    Object.keys(ratingWeights).forEach(skill => {
        const skillSlider = document.createElement('input');
        const skillLabel = document.createElement('div');
        skillLabel.innerText = skill;

        skillSlider.type = 'range';
        skillSlider.min = '0';
        skillSlider.max = '100';
        skillSlider.step = '1';
        skillSlider.value = '0';
        skillSlider.className = 'skill-slider';
        skillSlider.id = skill;
        skillSlider.setAttribute('data-skill', skill);
        skillsContainer.appendChild(skillLabel);
        skillsContainer.appendChild(skillSlider);
        sliders[skill] = skillSlider;
    });

    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', function() {
        let totalRating = 0;
        const skillValues = {};

        // Calculate total rating and collect slider values
        Object.keys(sliders).forEach(skill => {
            const slider = sliders[skill];
            const skillValue = parseInt(slider.value) / 100;
            skillValues[skill] = skillValue.toFixed(2);
        });

        // Normalize slider values to sum up to 1
        const sum = Object.values(skillValues).reduce((acc, curr) => acc + parseFloat(curr), 0);
        Object.keys(skillValues).forEach(skill => {
            skillValues[skill] = +(parseFloat(skillValues[skill]) / sum).toFixed(2);
            sliders[skill].value = skillValues[skill] * 100;
            totalRating += skillValues[skill];
        });

        // Display slider values
        outputDiv.innerHTML = '<h2>Slider Values:</h2><pre>' + JSON.stringify(skillValues, null, 4) + '</pre>';

        // Display total rating
        outputDiv.innerHTML += '<h2>Total Rating:</h2><p>' + totalRating.toFixed(2) + '</p>';
    });
});
