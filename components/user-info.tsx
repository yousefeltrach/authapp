

export default function UserInfo()  {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">Yousef</span>
        </div>
        <div>
          Email: <span className="font-bold">test@test.com</span>
        </div>
        <button className="bg-gray-600 text-white font-bold px-6 py-2 mt-3">
           Log out
        </button>
      </div>
    </div>
  )
}


 
 

