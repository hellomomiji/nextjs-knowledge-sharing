import Feed from "@components/Feed";

const Home = () => {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          <span className="blue_gradient text-center">Campus DevShare</span>
        </h1>
        <p className="desc text-center">
        Join our vibrant community to discover, create, and share valuable learning tips, practical insights, and innovative ideas. <br />
        Elevate your learning journey at Campus DevShare, where knowledge knows no boundaries
        </p>
        
        <Feed />
      </section>
    </div>
  )
}

export default Home