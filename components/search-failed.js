export function renderResults(keyword) {
    const container = document.getElementById('div-render-container');
    container.style.display ="none";
    const div = document.createElement('div');
    div.id ="noResult"
    container.parentElement.insertBefore(div,container);
    div.innerHTML = `
     <div class="h-screen w-full flex flex-col mt-4 bg-white">    
    <div class="flex justify-between mr-4 ml-4">
            <h1 id="faild-h1" class="font-semibold text-xl" value="">Results for "${keyword}"</h1>
            <h2 class="font-semibold">0 found</h2>
        </div>
        
        <!-- Main content -->  
        <div class="flex-grow flex flex-col items-center justify-center">  
            <div class="relative w-32 h-32">   
                <img src="/public/not found.png" class=""> 
            </div>  
            <h2 class="text-2xl font-bold mt-4">Not Found</h2>  
            <p class="text-center text-lg mt-2 px-8">  
                Sorry, the keyword you entered cannot be found, please check again or search with another keyword.  
            </p>  
        </div>  
        </div>
    `;
}

