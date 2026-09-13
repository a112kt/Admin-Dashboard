import { Box, Button, CircularProgress, IconButton, keyframes, Typography, Divider, Slider, Card, Stack } from "@mui/material";
import { ReelsType } from "../types";
import { useEffect, useRef, useState } from "react";
import { MutedIcon, UnMutedIcon, PauseIcon, PlayIcon, CloseIcon, CommentIcon, HeartIcon } from "@/components/ui/icons/icons";
import { useGetReelComments, useToggleReelLike } from "../hooks/reelsHooks";
import CommentBox from "./comment";
import GradientText from "@/components/ui/shared/gradientText/gradientText";
import { IconSend } from "@tabler/icons-react"
// import ProductsBottomSheet from "./bottomSheets/productsBottomSheets";
// import CommentsBottomSheet from "./bottomSheets/commentsBottomSheet";

const scaleOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(1.5);
    opacity: 0;
  }
`;
const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const scaleIn = keyframes`
  from {
  transform: scale(1.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function ReelComponent({ reel, reelId }: { reel: ReelsType, reelId: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [commentsPage, setCommentsPage] = useState<number>(1);
    const { data: comments, isLoading, isFetching, error, refetch } = useGetReelComments(reelId, commentsPage.toString());
    const [openComments, setOpenComments] = useState(false);
    const [openSidePart, setOpenSidePart] = useState(false);
    const [allComments, setAllComments] = useState<any[]>([]);
    const hasBeenIntersected = useRef(false);
    const [isLiked, setIsLiked] = useState(reel.isLikedByCurrentUser ?? false);
    const [likesCount, setLikesCount] = useState(reel.likesCount);
    const { mutate: toggleLike } = useToggleReelLike();

    const [muted, setMuted] = useState(true);
    const handleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted(!muted);
    }

    useEffect(() => {
        if (comments && openComments) {
            if (commentsPage === 1) {
                setAllComments(comments?.data?.data || []);
            } else {
                setAllComments((prev) => [...prev, ...comments?.data?.data?.filter((comment: any) => !prev.some((p) => p.id === comment.id))]);
            }
        }
    }, [comments, openComments]);

    useEffect(() => {
        if (!openComments) {
            setCommentsPage(1);
        }
    }, [openComments]);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play();

                }
                else {
                    videoRef.current?.pause();

                }
            }
            )
        });



    {
        threshold: 0.7
    }



    // useEffect(() => {
    //     if (videoRef.current) {
    //         observer.observe(videoRef.current);
    //     }
    //     return () => {
    //         if (videoRef.current) {
    //             observer.unobserve(videoRef.current);
    //         }
    //     };
    // }, [videoRef, reel]);
    const handlePlaying = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current?.paused) {
            videoRef.current?.play(); ///
        } else {
            videoRef.current?.pause();
        }
    }
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handlePause = () => setPaused(true);
        const handlePlay = () => setPaused(false);
        video.addEventListener("pause", handlePause);
        video.addEventListener("play", handlePlay);
        return () => {
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("play", handlePlay);
        };
    }, [videoRef, reel]);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
            setProgress((video.currentTime / video.duration) * 100);
        };
        const handleLoadedMeta = () => setDuration(video.duration);

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMeta);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMeta);
        };
    }, []);
    function handleOpenComments() {
        setOpenSidePart(true)
        setOpenComments(true);
    }
    function closeComments() {
        setOpenSidePart(false)
        setOpenComments(false);
    }


    return (
        <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ scrollSnapStop: "always", scrollSnapAlign: "start", WebkitTapHighlightColor: "transparent" }} >
            {/* {!isMobile && <Controllers reel={reel} handleComment={handleOpenComments} />} */}
            <Box onClick={(e) => { handlePlaying(e) }} bgcolor={"#1b235119"} sx={{ width: ["100%", "100%", "80%", "50%", "35%"], height: "100%", cursor: "pointer", boderRadius: 1 }} mx={"1"} my={1} position={"relative"} overflow={"hidden"}>
                <Box position={"absolute"} top={"50%"} left={10} zIndex={1}>

                    <Box onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(Number(reelId), {
                            onSuccess: (res: any) => {
                                const liked = res?.data ?? !isLiked;
                                setIsLiked(liked);
                                setLikesCount(prev => liked ? prev + 1 : prev - 1);
                            },
                            onError: () => {
                                setIsLiked(!isLiked);
                                setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
                            }
                        });
                    }} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px", cursor: "pointer" }}>
                        <HeartIcon width={30} height={30} fill={isLiked ? "#ff1744" : "white"} />
                        <Typography variant="body2" color="white" textAlign="center">{likesCount}</Typography>
                    </Box>
                    <Box onClick={(e) => {
                        e.stopPropagation()
                        handleOpenComments()
                    }} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
                        <IconButton>
                            <CommentIcon width={30} height={30} />
                        </IconButton>
                        <Typography variant="body2" color="white" textAlign="center">{reel.commentsCount}</Typography>
                    </Box>
                </Box>
                {/* {reel.brandName} */}
                <Box sx={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}>
                    <Button size="medium" onClick={(e) => { handleMute(e) }} sx={{ ':hover': { bgcolor: "transparent" } }}>
                        {muted ? <MutedIcon /> : <UnMutedIcon />}
                    </Button>
                </Box>
                <Box position={"absolute"} width={"100%"} sx={{ top: "calc(50% - 20px)", left: "calc(50% - 40px)" }} >
                    {!paused && <IconButton sx={{ animation: `${scaleOut} 0.8s ease-out forwards`, width: [70, 70, 70], height: [70, 70, 70] }} >
                        <PauseIcon width={"100%"} height={"100%"} />
                    </IconButton>}
                    {paused && <IconButton sx={{ animation: `${scaleIn} 0.3s ease-out forwards`, width: [70, 70, 70], height: [70, 70, 70] }}>
                        <PlayIcon width={"100%"} height={"100%"} />
                    </IconButton>}
                </Box>


                <Box sx={{ position: "absolute", bottom: 30, right: 15, color: "white", fontSize: 12, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", width: "fit-content" }}>
                    <Box>  {formatTime(currentTime)} / {formatTime(duration)}</Box>

                </Box>
                <Slider
                    value={progress}
                    onChange={(_, value) => {
                        const time =
                            (Number(value) / 100) * videoRef.current!.duration;

                        videoRef.current!.currentTime = time;
                    }}
                    sx={{
                        position: "absolute",
                        bottom: -15,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "99%",
                        color: "white",
                        margin: "auto",
                        height: "10px",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            height: "15px",
                            "& .MuiSlider-thumb": {
                                opacity: 1
                            }
                        },
                        "& .MuiSlider-track": {
                            backgroundColor: "#1B2351",
                            height: "30%",
                            padding: 0
                        },
                        "& .MuiSlider-thumb": {
                            backgroundColor: "#1B2351",
                            height: "20px",
                            width: "20px",
                            opacity: 0,
                            transition: "opacity 0.2s ease-in-out"

                        },
                        "& .MuiSlider-rail": {
                            backgroundColor: "#394063ff",
                        },
                        "& .MuiSlider-hovered": {
                            // backgroundColor: "#1B2351",
                            opacity: 1
                        },
                    }}></Slider>
                <video ref={videoRef} autoPlay={false} src={reel.videoUrl} width={"100%"} height={"100%"} preload="auto" muted={muted} style={{ objectFit: "cover" }}></video>
            </Box>
            <Box
                bgcolor={"transparent"}
                width={openSidePart ? "50%" : "0"}
                overflow={openSidePart ? "hidden" : "hidden"}
                display={"flex"}
                flexDirection={"column"}
                // maxHeight={"100%"}
                sx={{
                    transition: "all 0.4s ease-in-out",
                    opacity: openSidePart ? 1 : 0,
                    borderLeft: openSidePart ? "1px solid #e0e0e0" : "none",
                    borderRadius: "0 12px 12px 0",
                    boxShadow: "none",
                    overflowY: "auto",
                    height: "100%"
                }}
            >
                {openSidePart && openComments && ( // opening the comments part 
                    <>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2.5} py={2} flexShrink={0}>
                            <Box display={"flex"} alignItems={"center"} gap={1.5}>
                                <GradientText text={"Comments"} fontSize={16} />
                                <Box
                                    sx={{
                                        bgcolor: "#1B2351",
                                        color: "white",
                                        borderRadius: "10px",
                                        px: 1,
                                        py: 0.3,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {reel?.commentsCount}
                                </Box>
                            </Box>
                            <IconButton size="small" onClick={closeComments} sx={{ color: "#999" }}>
                                <CloseIcon width={18} height={18} fill="#323232" />
                            </IconButton>
                        </Box>
                        <Divider sx={{ borderColor: "#f0f0f0" }} />
                    </>
                )}
                {openComments && <Box flex={1} overflow={openSidePart && openComments ? "auto" : "hidden"} sx={{
                    "&::-webkit-scrollbar": { width: 4 },
                    "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "#d0d0d0", borderRadius: 4 },
                }}>
                    {isLoading && commentsPage === 1 && (
                        <Box display={"flex"} justifyContent={"center"} py={4}>
                            <CircularProgress size={24} sx={{ color: "#1B2351" }} />
                        </Box>
                    )}
                    {!isLoading && allComments?.length === 0 && (
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} py={6} px={2}>
                            <Typography variant="body1" color="#bbb" fontSize={14} textAlign="center">
                                No comments yet. Be the first!
                            </Typography>
                        </Box>
                    )}
                    {allComments?.length > 0 && (
                        <Box pb={1}>
                            {allComments?.map((comment: any) => (
                                <Box key={comment.id}>
                                    <CommentBox comment={comment} />
                                </Box>
                            ))}
                        </Box>
                    )}
                    {comments?.data?.meta?.hasNextPage && !isFetching && (
                        <Box display={"flex"} justifyContent={"center"} py={1}>
                            <Button
                                variant="text"
                                onClick={() => setCommentsPage((prev) => prev + 1)}
                                sx={{ color: "#1B2351", textTransform: "none", fontWeight: 500, width: "fit-content", borderRadius: 20, fontSize: 11 }}
                                size="small"
                            >
                                show more...
                            </Button>
                        </Box>
                    )}
                    {isFetching && (
                        <Box display={"flex"} justifyContent={"center"} py={1}>
                            <CircularProgress size={16} sx={{ color: "#1B2351" }} />
                        </Box>
                    )}
                </Box>}
            </Box>

        </Box >
    )
}