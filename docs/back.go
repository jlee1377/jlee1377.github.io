/*
  python3 -m http.server
*/
package main
import (
  "fmt"
  "os"
  "net/http"
)

func main(){
  fmt.Println("script initi")
}

func getDropDownList (user) {
  // TODO get user ID
  resp, err := http.Get("https://api.twitch.tv/helix/users?login="+user)
  if err != nil {
      log.Fatalln(err)
   }
   //We Read the response body on the line below.
   body, err := io.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }
   //Convert the body to type string
   sb := string(body)
   log.Printf(sb)


  // TODO get list of live streams
  resp, err := http.Get("https://api.twitch.tv/helix/streams/followed")
   if err != nil {
      log.Fatalln(err)
   }
   //We Read the response body on the line below.
   body, err := io.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }
   //Convert the body to type string
   sb := string(body)
   log.Printf(sb)
}
