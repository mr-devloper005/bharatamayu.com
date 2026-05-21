import Page, {

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
  generateMetadata as generateAliasMetadata,
  generateStaticParams as generateAliasStaticParams,
} from "../../listings/[slug]/page";

export const revalidate = 3;
export const generateMetadata = generateAliasMetadata;
export const generateStaticParams = generateAliasStaticParams;
export default Page;
