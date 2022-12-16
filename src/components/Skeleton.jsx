import ContentLoader from "react-content-loader";
    function Skeleton(){
        return(
            <ContentLoader
        speed={2}
        width={320}
        height={320}
        viewBox="0 0 320 320"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="50" y="0" rx="10" ry="10" width="150" height="91" />
        <rect x="50" y="100" rx="5" ry="5" width="150" height="15" />
        <rect x="50" y="123" rx="5" ry="5" width="100" height="15" />
        <rect x="50" y="162" rx="5" ry="5" width="80" height="24" />
        <rect x="168" y="156" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>
        );
    }

      export default Skeleton;