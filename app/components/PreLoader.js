import Loading from "./Loading"

export default function PreLoader({loadingPathname }) {
  console.log(loadingPathname )

  return (
    <div className="preloader">
      <div className="spinner"></div>
      <Loading />
    </div>
  )
}