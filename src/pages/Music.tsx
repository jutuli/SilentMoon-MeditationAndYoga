import { useEffect, useState } from "react";
import Headline from "../components/Headline";
import supabase from "../utils/supabase";
import { IMusic } from "../interfaces/IMusic";
import PlayButton from "../components/PlayButton";
import { useNavigate } from "react-router-dom";

const Music = () => {

  const [musicData, setMusicData] = useState<IMusic[] | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("music")
        .select("*");

      if (resp.data) {
        setMusicData(resp.data as unknown as IMusic[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

  const handlePlayClick = (id: string) => {
    navigate(`/music/${id}/player`);
  }


  return (
    <div className="pb-20 px-5">
      <Headline
        name="Good Vibes"
        description="Breathe. Sense. Feel. Transcend."
      />
      {musicData?.map((song)=> (
        <div key={song.id} className="pb-5">
          <PlayButton
          title={song?.title}
          duration={Number(song?.duration)}
          onClick={()=>handlePlayClick(song.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Music;
