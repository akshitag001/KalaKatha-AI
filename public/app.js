document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generator-form');
    const generateBtn = document.getElementById('generate-btn');
    const btnText = form.querySelector('.btn-text');
    const loader = form.querySelector('.loader');
    const resultsContainer = document.getElementById('results-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get values
        const scenario = document.getElementById('scenario').value;
        const style = document.getElementById('style').value;

        if (!scenario || !style) return;

        // UI Loading State
        setLoadingState(true);
        resultsContainer.classList.add('hidden');
        resultsContainer.innerHTML = '';

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ scenario, style })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate story.');
            }

            const data = await response.json();
            renderStory(data);

            // Smooth scroll to results
            setTimeout(() => {
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while generating the story: ' + error.message);
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.add('active');
            generateBtn.style.opacity = '0.8';
        } else {
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.remove('active');
            generateBtn.style.opacity = '1';
        }
    }

    function renderStory(data) {
        let htmlSnippet = `
            <div class="story-header glass-panel">
                <h2 class="story-title">${data.title}</h2>
                <p class="story-meta">Style: ${data.style} Art</p>
            </div>
        `;

        data.scenes.forEach((scene, index) => {
            const imageHtml = scene.imageUrl
                ? `<img src="${scene.imageUrl}" alt="Scene ${index + 1} illustrated in ${data.style} style" class="scene-image">`
                : `<div class="scene-image" style="display:flex; align-items:center; justify-content:center; background:#eee; color:#999; padding: 2rem;">
                     <em>Image could not be generated.</em>
                   </div>`;

            htmlSnippet += `
                <div class="scene-card" style="animation: float 2s ease-out forwards; animation-delay: ${index * 0.2}s">
                    ${imageHtml}
                    <div class="scene-content">
                        <p class="scene-text">${scene.text}</p>
                    </div>
                </div>
            `;
        });

        resultsContainer.innerHTML = htmlSnippet;
        resultsContainer.classList.remove('hidden');
    }
});
