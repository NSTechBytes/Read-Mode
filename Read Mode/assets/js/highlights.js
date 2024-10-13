document.addEventListener('DOMContentLoaded', function() {
    // Fetch highlights from Chrome storage
    chrome.storage.sync.get({ highlights: [] }, function(result) {
      const highlightsList = document.getElementById('highlightsList');
  
      // If there are no highlights, show a message
      if (result.highlights.length === 0) {
        highlightsList.innerHTML = '<p>No highlights saved yet.</p>';
        return;
      }
  
      // Iterate over the saved highlights and display them
      result.highlights.forEach((highlight, index) => {
        const highlightItem = document.createElement('div');
        highlightItem.classList.add('highlight');
  
        highlightItem.innerHTML = `
          <strong>${highlight.text}</strong>
          <div class="note">${highlight.note}</div>
          <div class="timestamp">${new Date(highlight.timestamp).toLocaleString()}</div>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
  
        highlightsList.appendChild(highlightItem);
      });
  
      // Add event listeners for each delete button
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          deleteHighlight(index);
        });
      });
    });
  
    // Function to delete a single highlight
    function deleteHighlight(index) {
      chrome.storage.sync.get({ highlights: [] }, function(result) {
        const updatedHighlights = result.highlights.filter((_, i) => i !== parseInt(index));
        chrome.storage.sync.set({ highlights: updatedHighlights }, function() {
          alert('Highlight deleted!');
          window.location.reload(); // Reload the page to reflect the changes
        });
      });
    }
  
    // Event listener for Delete All button
    document.getElementById('deleteAllBtn').addEventListener('click', function() {
      const confirmDelete = confirm('Are you sure you want to delete all highlights?');
      if (confirmDelete) {
        chrome.storage.sync.remove('highlights', function() {
          alert('All highlights deleted!');
          window.location.reload(); // Reload the page to reflect the changes
        });
      }
    });
  });
  