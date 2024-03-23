import ContentLoader from "react-content-loader";
import "./skeleton.scss";

const Skeleton = (props) => (
  <div className="skeleton">
    <p>{props.caption}</p>
    <ContentLoader
      speed={2}
      width={400}
      height={260}
      viewBox="0 0 400 260"
      backgroundColor="#c4c4c4"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="5" y="50" rx="3" ry="3" width="375" height="35" />
      <circle cx="25" cy="20" r="20" />
      <rect x="5" y="100" rx="3" ry="3" width="375" height="35" />
      <rect x="5" y="150" rx="3" ry="3" width="375" height="35" />
      <rect x="54" y="12" rx="3" ry="3" width="326" height="16" />
    </ContentLoader>
  </div>
);

export default Skeleton;
