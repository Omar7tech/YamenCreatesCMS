export default function VideoSection() {
    return (
        <div className="my-15 h-[300px] w-full overflow-hidden rounded-3xl px-5 md:h-[500px] md:px-10 lg:h-screen lg:px-20">
            <video
                className="inset-0 h-full w-full rounded-3xl object-cover"
                autoPlay
                loop
                muted
                playsInline
                src="/workhero.mp4"
            />
        </div>
    );
}
