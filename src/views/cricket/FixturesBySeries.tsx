import { useRoute , useNavigation } from "@react-navigation/native";
import {
  IFixture,
  IFixturesBySeriesResponse,
} from "../../interfaces/seriesResponse";
import { StyleSheet, View, Text, FlatList, Pressable, Image } from "react-native";
import moment from "moment";
import { useEffect, useState } from "react";
import { Loader } from "../../component/Loader";
import { BackArrow } from "../../assets/iconWrappers/BackArrow";

const mockResponse: IFixturesBySeriesResponse = {
  results: [
    {
      away: {
        name: "Lancashire",
      },
      date: "2020-09-11T17:00:00+00:00",
      home: {
        name: "Yorkshire",
      },
      match_subtitle: "North Group",
      match_title:
        "Nottinghamshire v Lancashire at Trent Bridge, Nottingham (night), T20.",
      result: "",
      venue: "Trent Bridge, Nottingham (night)",
    },
  ],
};

export const FixturesBySeries = () => {
  const route = useRoute();
  //@ts-ignore
  const { seriesId } = route?.params;

  const [loading, setLoading] = useState<boolean>(true);
  const [fixtures, setFixtures] = useState<IFixture[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://cricket-live-data.p.rapidapi.com/fixtures-by-series/${seriesId}`, {
      headers: {
        "X-RapidAPI-Key": "71535109e2mshaeba54bcae6f51dp1c2a6fjsn6fef532752cf",
        "X-RapidAPI-Host": "cricket-live-data.p.rapidapi.com",
      },
    }).then(async (response) => {
        const jsonResponse : IFixturesBySeriesResponse = await response.json();
        setFixtures(jsonResponse.results);
    }).catch((error) => console.error(error)).finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: IFixture }) => {
    return (
      <View style={[styles.seriesCard]}>
        <Text
          style={[styles.cardHeading]}
        >{`${item.home.name} VS ${item.away.name}`}</Text>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          {item.match_subtitle}
        </Text>
        <Text>{`Venue: ${item.venue}`}</Text>
        <Text>{`Date: ${moment(item.date).format("DD-MMM-YYYY")}`}</Text>
      </View>
    );
  };

  return (
    <>
        
        <View
        style={{
            flex: 1,
            backgroundColor: "#000000",
        }}
        >
            <Pressable
                onPress={() => navigation.goBack()}
                style={{
                    paddingTop : 10,
                    paddingLeft : 10,
                    marginVertical : 20
                }}
            >
                <BackArrow />
            </Pressable>
            {fixtures.length === 0 && !loading && (
            <View
                style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}
            >
                <Image source={require('../../assets/sad-face.png')} style={{
                    width : 100,
                    height : 100,
                    resizeMode : 'contain'
                
                }}/>
                <Text
                    style={{
                        textAlign : 'center',
                        fontSize : 20,
                        fontWeight : 'bold',
                        color : '#FFFFFF'
                    }}
                >No fixture found for this series</Text>
            </View>
        )}
        <FlatList data={fixtures} renderItem={renderItem} keyExtractor={(item) => item.date}/>
        {loading && <Loader isVisible={loading} message="Loading Fixtures" />}
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  seriesCard: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFF9C4",
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
