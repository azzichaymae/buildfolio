const Home = () => {
  const token = localStorage.getItem("token") || null;
     return (
          <>
        
           <section
          class="text-center py-20 px-4"
          style={{ background: "linear-gradient(180deg, #C3B9F9 0%, #F9F9FF 100%)" }}

        >
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Buildfolio</h1>
          <p class="text-gray-800 text-lg max-w-xl mx-auto leading-relaxed">
            Easily create and share your unique portfolio.<br />
            Showcase your projects, skills, education, experience and more.
          </p>
          <a
            href={token ?"/dashboard" : "/login"}
           
          >
               <button  class="button mt-5 px-6 py-3 rounded-full font-bold text-white shadow-lg"
            style={{background: "linear-gradient(135deg, #7B6FC6 0%, #9B8FFB 100%)"}}>
                    Get Started
               </button>
            
          </a>
        </section>
     
        <section class="max-w-7xl mx-auto px-4 py-16">
          <h2 class="text-center text-2xl font-extrabold mb-12">How It Works</h2>
          <div class="flex flex-col sm:flex-row justify-center gap-6 max-w-5xl mx-auto">
          
            <div
              class="bg-gray-50 rounded-xl p-6 flex-1 max-w-xs mx-auto sm:mx-0 text-center"
            >
              <div
                class="mx-auto mb-4 w-10 h-10 rounded-md bg-purple-200 flex items-center justify-center text-purple-600"
              >
                <i class="fas fa-id-card-alt text-sm"></i>
              </div>
              <h3 class="text-purple-600 font-semibold mb-2">Add Your Info</h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Easily fill in your projects, competences, education, and experience.
              </p>
            </div>
      
            <div
              class="bg-gray-50 rounded-xl p-6 flex-1 max-w-xs mx-auto sm:mx-0 text-center"
            >
              <div
                class="mx-auto mb-4 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-400"
              >
                <i class="fas fa-chart-line text-sm"></i>
              </div>
              <h3 class="text-purple-600 font-semibold mb-2">Customize & Preview</h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Personalize your portfolio's look and see updates instantly.
              </p>
            </div>
      
            <div
              class="bg-gray-50 rounded-xl p-6 flex-1 max-w-xs mx-auto sm:mx-0 text-center"
            >
              <div
                class="mx-auto mb-4 w-10 h-10 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-400"
              >
                <i class="fas fa-credit-card text-sm"></i>
              </div>
              <h3 class="text-purple-600 font-semibold mb-2">Share & Shine!</h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Share your unique link and get noticed by the world.
              </p>
            </div>
          </div>
        </section>
          </>
         
      
      
     );
     }
     export default Home;