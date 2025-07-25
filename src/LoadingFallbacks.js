import { Box, CircularProgress } from "@mui/material";

export const LoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}
    >
        <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} />
    </Box>
)

export const DefaultLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/mobileLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const ElveeLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/Gif_Loder.gif"
            alt="Loading..."
            width="auto"
            loading="lazy"
            style={{
                maxWidth: '200px',
                width: '100%',
                height: 'auto',
            }}
        />
    </Box>
);

export const ShreeDiamondsLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/shreeLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const KamalikaJewelssLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/kamalikaLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const VaraLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/varaLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const PacificLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/pacificLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const OjasviLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/ojasviLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);

export const ShinjiniLoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
        }}
    >
        <img
            src="/shinjiniLogo.png"
            alt="Loading..."
            height="100%"
            width="auto"
            loading="lazy"
        />
    </Box>
);