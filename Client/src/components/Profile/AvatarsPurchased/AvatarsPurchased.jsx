const AvatarsPurchased = ({ avatar = {} }) => {
    return (
        <figure className="w-16 h-16 rounded-full overflow-hidden">
            <img src={avatar} alt="Profile Picture" className="w-full h-full object-cover" />
        </figure>
    );

}

export default AvatarsPurchased;