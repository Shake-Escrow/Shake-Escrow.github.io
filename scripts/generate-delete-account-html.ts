import fs from 'fs-extra';
import path from 'path';

const generateDeleteAccountHtml = async () => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Account - Shake Defi</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Lexend+Exa:wght@400;500;600;700;900&display=swap" rel="stylesheet">
    <style>
      body { 
        font-family: 'Lexend Deca', sans-serif; 
        line-height: 1.6; 
        margin: 0;
        padding: 0;
        color: #333; 
        background: white;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      h1, h2, h3, h4, h5, h6 { 
        font-family: 'Lexend Exa', sans-serif; 
        font-weight: 900;
      }
      
      .container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
      
      .content {
        max-width: 32rem;
        width: 100%;
        text-align: center;
      }
      
      h1 {
        font-size: 2.5rem;
        color: #1f2937;
        margin-bottom: 1.5rem;
      }
      
      @media (min-width: 768px) {
        h1 {
          font-size: 3rem;
        }
      }
      
      .description {
        font-size: 1.125rem;
        color: #6b7280;
        margin-bottom: 2rem;
      }
      
      .form-container {
        max-width: 28rem;
        margin: 0 auto;
      }
      
      input[type="email"] {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 1rem;
        margin-bottom: 1rem;
        box-sizing: border-box;
      }
      
      input[type="email"]:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      input[type="email"]:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
      }
      
      button {
        width: 100%;
        padding: 0.875rem 1.5rem;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      button:hover:not(:disabled) {
        background-color: #2563eb;
      }
      
      button:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
      }
      
      .success {
        background-color: #10b981;
      }
      
      .success:hover {
        background-color: #10b981;
      }
      
      .error-message {
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <h1>Delete Account</h1>
        
        <p class="description">
          Enter your account email address to delete your account
        </p>
        
        <div class="form-container">
          <input
            type="email"
            id="emailInput"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          
          <button id="submitButton" onclick="handleSubmit()">
            Submit
          </button>
          
          <div id="errorMessage" class="error-message" style="display: none;"></div>
        </div>
      </div>
    </div>

    <script>
      const emailInput = document.getElementById('emailInput');
      const submitButton = document.getElementById('submitButton');
      const errorMessage = document.getElementById('errorMessage');
      
      let isSubmitted = false;
      
      async function handleSubmit() {
        const email = emailInput.value.trim();
        
        if (!email) {
          showError('Please enter your email address');
          return;
        }
        
        if (!isValidEmail(email)) {
          showError('Please enter a valid email address');
          return;
        }
        
        // Disable form
        emailInput.disabled = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        hideError();
        
        try {
          const apiEndpoint = '${apiEndpoint}';
          
          const response = await fetch(apiEndpoint, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
          });
          
          const data = await response.json();
          
          if (data.success) {
            isSubmitted = true;
            submitButton.textContent = 'Request Submitted';
            submitButton.classList.add('success');
            
            // Reset after 3 seconds
            setTimeout(() => {
              isSubmitted = false;
              emailInput.value = '';
              emailInput.disabled = false;
              submitButton.disabled = false;
              submitButton.textContent = 'Submit';
              submitButton.classList.remove('success');
            }, 3000);
          } else {
            showError(data.error || 'There was an error processing your request. Please try again.');
            emailInput.disabled = false;
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
          }
        } catch (error) {
          console.error('Network error:', error);
          showError('There was an error processing your request. Please try again.');
          emailInput.disabled = false;
          submitButton.disabled = false;
          submitButton.textContent = 'Submit';
        }
      }
      
      function isValidEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
      }
      
      function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
      }
      
      function hideError() {
        errorMessage.style.display = 'none';
      }
      
      // Allow Enter key to submit
      emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      });
      
      // Clear error on input
      emailInput.addEventListener('input', hideError);
    </script>
  </body>
</html>`;

  // Write to public/ (Vite will copy to dist/ on build)
  const outputPath = path.join(process.cwd(), 'public', 'delete-account.html');
  await fs.writeFile(outputPath, htmlContent);
  console.log(`✅ Generated static delete-account.html`);
};

generateDeleteAccountHtml().catch(console.error);