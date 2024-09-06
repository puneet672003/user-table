import UserList from "../components/UserList";

const HomePage = () => {
	return (
		<div className="home-container bg-gray-950 min-h-screen px-[20px] md:px[40px] lg:px-[80px] py-[10px] md:py-[20px]">
			<UserList />
		</div>
	);
};

export default HomePage;
