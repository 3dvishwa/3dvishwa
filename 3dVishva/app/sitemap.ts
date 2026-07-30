import type { MetadataRoute } from "next";


export default function sitemap()
    : MetadataRoute.Sitemap {


    return [

        {
            url:
                "https://www.3dvishwa.com",

            lastModified:
                new Date(),

        },


    ];

}